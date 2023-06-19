import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;
  @Input() erro? = {
    conteudo: '',
    autoria: ''
  }

  constructor(
    private router: Router,
    private service: PensamentoService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
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

  //trecho de código omitido
  criarPensamento() {
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => this.router.navigate(['/listarPensamento']))
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
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

  habilitarBotao() {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
