import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminDTO } from '../../../../types/admin.types';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SuperUserService } from 'src/app/services/superuser.service';
import { ModelFormGroup } from '@shared/constants';
import { Observable, iif, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  protected selectedUser: AdminDTO;

  @ViewChild(MatTable) table: MatTable<AdminDTO>;

  userForm: ModelFormGroup<Omit<AdminDTO, 'admin_id'>>;

  constructor(
    private readonly adminService: SuperUserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AdminDTO>();
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loadAdmins();
  }

  dataSource: MatTableDataSource<AdminDTO>;

  columnas: string[] = ['email', 'password', 'edit', 'delete'];

  edit(user: AdminDTO): void {
    if (this.selectedUser !== undefined) return;
    this.selectedUser = user;
    this.userForm.patchValue({
      email: this.selectedUser.email,
      password: '',
    });
  }

  deleteRow(element: AdminDTO): void {
    this.adminService.removeAdmin(element).subscribe((_) => {
      this.dataSource.data = this.dataSource.data.filter(
        (_element) => _element !== element
      );
      this.table.renderRows();
    });
  }

  crearFila(): void {
    this.selectedUser = this.createEmptyAdmin();
    this.dataSource.data.push(this.selectedUser);
    this.table.renderRows();
  }

  sendEdit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.selectedUser.email = this.control('email').value;
      this.selectedUser.password = this.control('password').value;
      iif(
        () => this.selectedUser.admin_id === 0,
        this.addAdmin(),
        this.editAdmin()
      ).subscribe();
    }
  }

  addAdmin(): Observable<AdminDTO> {
    return this.adminService
      .addAdmin(this.selectedUser)
      .pipe(tap(() => this.clearElementAndForm()));
  }

  editAdmin(): Observable<AdminDTO> {
    return this.adminService
      .updateAdmin(this.selectedUser)
      .pipe(tap(() => this.clearElementAndForm()));
  }

  cancelEdit() {
    console.log(this.selectedUser);
    if (this.selectedUser.admin_id === 0) {
      this.dataSource.data.pop();
      this.table.renderRows();
    }
    this.clearElementAndForm();
  }

  private clearElementAndForm() {
    this.selectedUser = undefined;
    this.userForm.reset();
  }

  control(controlName: keyof AdminDTO) {
    return this.userForm.get(controlName) as FormControl;
  }

  loadAdmins(): void {
    this.adminService
      .loadAdmins()
      .subscribe((admins) => (this.dataSource.data = admins));
  }

  private createEmptyAdmin(): AdminDTO {
    return {
      admin_id: 0,
      email: '',
      password: '',
    };
  }
}
