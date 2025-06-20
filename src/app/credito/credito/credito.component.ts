import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreditoService } from '../credito.service';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreditoComponent {
  filtroTipo = new FormControl<'nfe' | 'credito'>('nfe');
  valorFiltro = new FormControl('');
  creditos: any[] = [];
  loading = false;
  erro: string | null = null;

  constructor(private creditoService: CreditoService) {}

  buscar() {
    this.erro = null;
    this.creditos = [];
    const valor = this.valorFiltro.value;
    if (!valor) {
      this.erro = 'Informe o número da NFe ou do Crédito.';
      return;
    }
    this.loading = true;
    if (this.filtroTipo.value === 'nfe') {
      this.creditoService.buscarPorNfe(valor).subscribe({
        next: (res) => {
          this.creditos = res || [];
          this.loading = false;
          if (!this.creditos.length) this.erro = 'Nenhum crédito encontrado.';
        },
        error: (err) => {
          this.erro = err?.error?.message || 'Erro ao buscar créditos.';
          this.loading = false;
        }
      });
    } else {
      this.creditoService.buscarPorCredito(valor).subscribe({
        next: (res) => {
          this.creditos = res ? [res] : [];
          this.loading = false;
          if (!this.creditos.length) this.erro = 'Nenhum crédito encontrado.';
        },
        error: (err) => {
          this.erro = err?.error?.message || 'Erro ao buscar crédito.';
          this.loading = false;
        }
      });
    }
  }
}
