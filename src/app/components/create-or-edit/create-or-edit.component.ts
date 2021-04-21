import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionType } from 'src/app/interfaces/permission-type';
import { ApplicationService } from 'src/app/services/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css']
})
export class CreateOrEditComponent implements OnInit {

  permission: Permission;
  permissionTypes: PermissionType[];
  id: number;

  constructor(private appService: ApplicationService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.GetAllTypes();

    this.id = activatedRoute.snapshot.params['id'];
    
    this.permission = {
      empName: "",
      empLastName: "",
      pType: 0,
      pDate: ""
    }
  }

  ngOnInit(): void {
    if(this.id){
      this.appService.getById(this.id).subscribe((data: Permission) => {
        this.permission = data;
        this.permission.pDate = this.permission.pDateFormated;
      })
    }
  }

  GetAllTypes(){
    this.appService.getAllTypes().subscribe((data: PermissionType[]) => {
      this.permissionTypes = data;
    }, (err) => {
      console.log(err);
    })
  }

  SaveForm(){
    if (this.permission.id){
      this.Edit();
      return
    }

    this.Create();
  }

  Create(){
    this.appService.create(this.permission).subscribe(() => {
      Swal.fire('Creado!', 'Registro agregado!', 'success').then(() => {
        this.route.navigate(['/']);
      });
    }, (err) => {
      console.log(err);
      let message = err.error.message ? err.error.message : 'Registro no creado';
      Swal.fire('Error!', message , 'error');
    })
  }

  Edit(){
    this.appService.update(this.permission).subscribe(() => {
      Swal.fire('Actualizado!', 'Registro actualizado!', 'success').then(() => {
        this.route.navigate(['/']);
      });
    }, (err) => {
      console.log(err);
      let message = err.error.message ? err.error.message : 'Registro no actualizado';
      Swal.fire('Error!', message, 'error');
    })
  }

}
