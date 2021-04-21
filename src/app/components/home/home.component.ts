import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionDto } from 'src/app/interfaces/permission-dto';
import { PermissionType } from 'src/app/interfaces/permission-type';
import { ApplicationService } from 'src/app/services/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  permissions: Permission[];

  constructor(private appService: ApplicationService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(){
    this.appService.getAll().subscribe((data: Permission[]) => {
      this.permissions = data;
      this.permissions.forEach(permission => {
        this.appService.getType(permission.pType).subscribe((type: PermissionType) => {
          permission.pType = type.description;
        })
      })
    }, (err) => {
      console.log(err)
    })
  }

  Delete(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Borrar!',
      text: "Confirmas que desas borrar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si.',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.appService.delete(id).subscribe(() => {
          swalWithBootstrapButtons.fire(
            'Borrado!',
            'Registro borrado con exito.',
            'success'
          );
          this.GetAll();
        }, (err) => {
          Swal.fire('Error!', 'Registro no borrado', 'error');
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Registro no borrado',
          'error'
        );
      }
    })
  }

}
