import React, { Component } from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    isCadastrado: false,
    errors: [],
    isAtualizando: false
}

class CadastroProduto extends Component {

    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (e) => {
        const valor = e.target.value;
        const nomeCampo = e.target.name;
        this.setState({ [nomeCampo]: valor })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {
            this.service.salvar(produto)
            this.limparCampos()
            this.setState({ isCadastrado: true })
        } catch (erro) {
            const errors = erro.errors
            this.setState({ errors: errors })
        }

    }

    limparCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount() {
        const sku = this.props.match.params.sku
        if (sku) {
            const resultado = this.service.obterProdutos().filter(p => p.sku === sku)
            if (resultado.length === 1) {
                const produtoEncontrado = resultado[0];
                this.setState({ ...produtoEncontrado, isAtualizando: true })
            }
        }
    }

    render() {
        return (
            <div className="card border-primary">
                <div className="card-header">{this.state.isAtualizando ? 'Atualização ' : 'Cadastro '} de Produto</div>

                <div className="card-body">
                        {this.state.isCadastrado &&
                            <div class="alert alert-dismissible alert-success">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                <strong>Parabéns! </strong>Cadastro concluído com sucesso!
                </div>}
                        {this.state.errors.length > 0 &&
                            this.state.errors.map(msg => {
                                return (
                                    <div class="alert alert-dismissible alert-danger">
                                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        <strong>Erro! </strong> {msg}
                                    </div>
                                )
                            })
                        }
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nome*:</label>
                                        <input type="text" name='nome' value={this.state.nome} className="form-control" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>SKU*:</label>
                                        <input type="text" name='sku' value={this.state.sku} className="form-control" onChange={this.onChange} disabled={this.state.isAtualizando} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Descrição:</label>
                                        <textarea name='descricao' value={this.state.descricao} className="form-control" onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Preço*:</label>
                                        <input type="text" name='preco' value={this.state.preco} className="form-control" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Fornecedor*:</label>
                                        <input type="text" name='fornecedor' value={this.state.fornecedor} className="form-control" onChange={this.onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1">
                                    <button className="btn btn-success" onClick={this.onSubmit}>{this.state.isAtualizando ? 'Atualizar' : 'Salvar'}</button>
                                </div>
                                <div className="col-md-1">
                                    <button className="btn btn-info" onClick={this.limparCampos}>Limpar</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CadastroProduto);