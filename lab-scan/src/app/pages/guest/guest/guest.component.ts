import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentRequest } from '../../../types/student.types';
import { GuestService } from 'src/app/services/guest.service';
import { LaboratoryDTO } from '../../../types/laboratory.types';
import { Subject, catchError, concatMap, debounceTime, distinctUntilChanged, filter, last, map, retry, switchMap, takeUntil, tap } from 'rxjs';
import { ModelFormGroup } from '@shared/constants';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GroupResponse } from '../../../types/group.types';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit, OnDestroy {

    private destroyer$: Subject<boolean> = new Subject<boolean>()
    private scanned: boolean = false
    protected student: StudentRequest = new StudentRequest()

    protected identifiers: string[] = []
    protected labs: LaboratoryDTO[] = []

    protected partialStudentForm: ModelFormGroup<Pick<StudentRequest, 'student_full_name' | 'student_pc_number' | 'student_report_number'>>

    protected groupForm: FormControl = new FormControl('')

    protected showQrCode = false
    protected showSacademDate = false

    protected currentLab: LaboratoryDTO | null = null
    protected currentGroups: GroupResponse[] = []

    @ViewChild('identifierSelect')
    protected identifierSelect: MatSelect

    constructor(
        private readonly guestService: GuestService,
        private readonly formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.partialStudentForm = this.formBuilder.group({
            student_full_name: ['', Validators.required],
            student_pc_number: ['', Validators.required],
            student_report_number: ['', Validators.required]
        })

        this.guestService.getIdentifiers().pipe(
            tap(identifiers => this.identifiers = identifiers),
            concatMap(_ => this.guestService.getLabs()),
            tap(labs => this.labs = labs)
        ).subscribe()

        this.onKeyUpStudentReportNumber()
    }

    ngOnDestroy(): void {
        this.destroyer$.next(true)
        this.destroyer$.complete()
    }

    onLabChange(lab: LaboratoryDTO) {
        this.guestService.getGroupsOfTheWeek(lab.lab_name)
            .pipe(
                tap(_ => this.currentLab = lab),
                map(groups => this.filterGroups(lab, groups)),
                tap(filtered => this.currentGroups = filtered)
            ).subscribe()
    }

    onIdentifierChange(identifier: string) {
        this.student.student_identification_type = identifier
        this.showQrCode = identifier === 'CREDENCIAL ESTUDIANTE'
        this.showSacademDate = !this.showQrCode
        this.identifierSelect.value = identifier
    }

    onSelectedGroup(group: GroupResponse) {
        console.log('SELECTED: ', group)
        if (!this.currentLab)
            throw new Error('No se ha seleccionado un laboratorio')

        this.currentGroups.splice(this.currentGroups.indexOf(group), 1)

        if (!this.student.groups.has(this.currentLab.lab_name))
            this.student.groups.set(this.currentLab.lab_name, [])
        const groups = this.student.groups.get(this.currentLab.lab_name)
        groups.push(group)
        groups.sort((a, b) => a.group_name.localeCompare(b.group_name))
    }

    onRemoveSelectedGroup(group: GroupResponse) {
        const labName = this.getFrom(group, 'laboratory')
        const groups = this.student.groups.get(labName)
        const removed = groups?.splice(groups.indexOf(group), 1)[0]
        if (removed && this.currentLab?.lab_name === labName) {
            this.currentGroups.push(removed)
            this.currentGroups.sort((a, b) => a.group_name.localeCompare(b.group_name))
        }
    }

    submit() {
        if (this.partialStudentForm.valid) {
            Object.assign(this.student, this.partialStudentForm.value)
            const copyWithoutLabName = new Map<string, GroupResponse[]>()

            this.student.groups.forEach((value, key) => {
                const withoutLabName = value.map(group => {
                    const onlyGroup = { ...group }
                    onlyGroup.group_name = this.getFrom(group, 'group')
                    return onlyGroup
                })
                copyWithoutLabName.set(key, withoutLabName)
            })

            const temporal = this.student.groups
            this.student.groups = copyWithoutLabName

            if (this.isNewStudent)
                this.guestService.save(this.student)
                    .subscribe(saved => {
                        this.student.student_id = saved.student_id
                        this.student.groups = temporal
                    })
            else
                this.guestService.update(this.student).subscribe(_ => this.student.groups = temporal)
        }
    }

    set _student(student: StudentRequest | null) {
        if (!student) return
        this.student = student
        this.partialStudentForm.patchValue(student)
        this.onIdentifierChange(student.student_identification_type)
    }

    get allSelectedGroups(): GroupResponse[] {
        return [...this.student.groups.values()].flatMap(value => value)
    }

    get isNewStudent() {
        return this.student.student_id === 0
    }

    get doneButtonName() {
        return this.isNewStudent ? 'Registrar' : 'Actualizar'
    }

    private filterGroups(lab: LaboratoryDTO, groups: GroupResponse[]): GroupResponse[] {
        return groups.filter(group => ![...this.student.groups.values()].flatMap(g => g).find(selected => selected.group_name === group.group_name))
    }

    private onKeyUpStudentReportNumber() {
        this.partialStudentForm.controls.student_report_number.valueChanges.pipe(
            filter(value => !this.scanned && !!value),
            distinctUntilChanged(),
            debounceTime(700),
            switchMap(reportNumber => this.guestService.findByStudentReportNumber(reportNumber)),
            tap(found => this._student = found),
            takeUntil(this.destroyer$),
            catchError(error => {
                console.error(error)
                return error
            }),
            retry()
        ).subscribe()
    }

    private getFrom(group: GroupResponse, type: 'laboratory' | 'group'): string {
        return type === 'laboratory'
            ? group.group_name.split('-')[1].trim()
            : group.group_name.split('-')[0].trim()
    }

    private addToMap<K, V>(map: Map<K, V[]>, key: K, value: V) {
        if (!map.has(key))
            map.set(key, [])
        map.get(key).push(value)
    }

    private putCurrentGroup() {
        throw new Error('Not implemented yet')
    }

}
