import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminDTO } from '../../../../types/admin.types';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/superuser.service';
import { ModelFormGroup } from '@shared/constants';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    protected selectedUser: AdminDTO

    @ViewChild(MatTable) table: MatTable<AdminDTO>;

    userForm: ModelFormGroup<Omit<AdminDTO, 'admin_id'>>;

    constructor(
        private readonly adminService: AdminService,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<AdminDTO>()
        this.userForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.loadAdmins()
    }

    dataSource: MatTableDataSource<AdminDTO>;

    columnas: string[] = ['email', 'password', 'edit', 'delete'];

    edit(user: AdminDTO): void {
        if (this.selectedUser !== undefined) return
        this.selectedUser = user
        this.userForm.patchValue({
            email: this.selectedUser.email,
            password: ''
        })
    }

    deleteRow(element: AdminDTO): void {
        this.adminService.removeAdmin(element).subscribe(_ => {
            this.dataSource.data = this.dataSource.data.filter(_element => _element !== element);
            this.table.renderRows()
        })
    }

    crearFila(): void {
        this.selectedUser = this.createEmptyAdmin()
        this.dataSource.data.push(this.selectedUser)
        this.table.renderRows()
    }

    sendEdit() {
        this.userForm.markAllAsTouched()
        if (this.userForm.valid) {
            Object.assign(this.selectedUser, this.userForm.value)
            this.adminService.addAdmin(this.selectedUser).subscribe(saved => {
                this.selectedUser.admin_id = saved.admin_id
                this.selectedUser.password = '********'
                this.clearElementAndForm()
            })
        }
    }

    cancelEdit() {
        console.log(this.selectedUser)
        if (this.selectedUser.admin_id === 0) {
            this.dataSource.data.pop()
            this.table.renderRows()
        }
        this.clearElementAndForm()
    }

    private clearElementAndForm() {
        this.selectedUser = undefined
        this.userForm.reset()
    }

    control(controlName: keyof AdminDTO) {
        return this.userForm.get(controlName) as FormControl
    }

    loadAdmins(): void {
        this.adminService.loadAdmins().subscribe(admins => this.dataSource.data = admins)
    }

    private createEmptyAdmin(): AdminDTO {
        return {
            admin_id: 0,
            email: '',
            password: ''
        }
    }

}



