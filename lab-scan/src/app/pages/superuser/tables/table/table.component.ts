import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminResponseDTO } from '../../../../types/admin.types';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  protected selectedUser : AdminResponseDTO

  @ViewChild(MatTable) table: MatTable<AdminResponseDTO>;

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AdminResponseDTO>(ELEMENT_DATA)
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  dataSource : MatTableDataSource<AdminResponseDTO> ;

  columnas: string[] = ['email', 'password', 'edit', 'delete'];

  edit(user: AdminResponseDTO): void {
    if(this.selectedUser !== undefined) return
    this.selectedUser = user
    this.userForm.patchValue({
      email: this.selectedUser.email,
      password: ''
    })
  }

  deleteRow(element: AdminResponseDTO): void {
    console.log(this.dataSource.data)
    this.dataSource.data = this.dataSource.data.filter(_element => _element !== element);
    this.table.renderRows()
  }

  crearFila(): void {
    this.selectedUser = {
      admin_id: 0,
      email: '',
      password: ''
    }
    this.dataSource.data.push(this.selectedUser)
    this.table.renderRows()
  }

  sendEdit(){
    this.userForm.markAllAsTouched()
    if(this.userForm.valid){
      this.selectedUser.email = this.control('email').value 
      this.selectedUser.password = this.control('password').value 
      this.clearElementAndForm()
    }
  }

  cancelEdit(){
    console.log(this.selectedUser)
    if(this.selectedUser.admin_id === 0){
      this.dataSource.data.pop()
      this.table.renderRows()
    }
    this.clearElementAndForm()
  }

  private clearElementAndForm(){
    this.selectedUser = undefined
    this.userForm.reset()
  }

  control(controlName : keyof AdminResponseDTO){
    return this.userForm.get(controlName) as FormControl
  }

}

const ELEMENT_DATA: AdminResponseDTO[] = [
  {
    admin_id: 1,
    email: 'email',
    password: 'password'
  },
  {
    admin_id: 2,
    email: 'email2',
    password: 'password2'
  }
];



