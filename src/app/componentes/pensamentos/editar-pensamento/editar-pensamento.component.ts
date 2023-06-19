import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from './../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  formulario!: FormGroup;
  @Input() erro? = {
    conteudo: '',
    autoria: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
        this.pensamento = pensamento
    })
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      modelo: ['modelo1'],
      favorito: false
    })
  }

  editarPensamento() {
    this.service.editar(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao() {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  obterErro(erro?: ValidationErrors | null | undefined) {
    if (erro?.['minlength']) {
      this.erro!.autoria = 'Mínimo de caracteres: 3'
    }
    if(erro?.['required']){
      this.erro!.autoria = 'Campo Obrigatório'
      this.erro!.conteudo = 'Campo Obrigatório'
    }
  }
}
