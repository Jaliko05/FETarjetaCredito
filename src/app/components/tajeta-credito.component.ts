import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from '../services/tarjeta.service';

@Component({
  selector: 'app-tajeta-credito',
  templateUrl: './tajeta-credito.component.html',
  styleUrls: ['./tajeta-credito.component.css'],
})
export class TajetaCreditoComponent {
  lisTarjetas: any[] = [];
  accion = 'agregar';
  id: number | undefined;

  form!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private _tarjetaService: TarjetaService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.ObtenerTarjetas();
  }

  ObtenerTarjetas() {
    this._tarjetaService.getLisTarjetas().subscribe(
      (data) => {
        this.lisTarjetas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTarjeta(): void {
    const tarjeta: any = {
      titulo: this.form.get('titulo')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      this._tarjetaService.addTarjeta(tarjeta).subscribe(
        (data) => {
          this.ObtenerTarjetas();
          this.form.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'agregar';
          this.id = undefined;
          console.log('tarjeta actualizada');
          this.ObtenerTarjetas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(
      (data) => {
        console.log('la tarjeta fue eliminada con exito' + data);
        this.ObtenerTarjetas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titulo: tarjeta.titulo,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }
}
