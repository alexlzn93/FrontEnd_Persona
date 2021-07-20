import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Persona } from './persona/persona';
import {PersonaServiceService} from './persona/persona-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   personaForm: FormGroup ;
   public persona:Persona= new Persona();
   public listPersonas: Persona[];
  constructor(
    public formbuilder: FormBuilder,
    public personaService : PersonaServiceService,
   ){

  }
  ngOnInit(): void {
    //Creando el formulario con angular y los Validators son campos requeridos
    this.personaForm= this.formbuilder.group({
      id: [''],
  		nombre : ['', Validators.required],
  		apellido : ['', Validators.required],
  		nacionalidad :['', Validators.required],
  		edad : ['', Validators.required]
    })
    //obtengo todas las persona
    this.personaService.listarPersonas().subscribe(
      personas => this.listPersonas= personas
    );
  }

  guardar():void{
    //metodo addPersona del servicio y le paso por parametro los valores del formulario.
    this.personaService.addPersona(this.personaForm.value).subscribe(
      person => { this.personaForm.reset();
      this.listPersonas= this.listPersonas.filter(persona=> person.id!=persona.id);
        this.listPersonas.push(person);

      }

    )
  }

  eliminarPersona(id:number):void{
      this.personaService.deletePersona(id).subscribe(
        resp=>{
          console.log(resp)

          this.listPersonas.pop()

        }
      )

  }

  editarPersona(persona){
    this.personaForm.setValue({
      id: persona.id,
      nombre : persona.nombre,
      apellido : persona.apellido,
      nacionalidad : persona.nacionalidad,
      edad : persona.edad
    })
  }

}
