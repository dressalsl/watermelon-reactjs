import React, { Component } from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter } from 'react-router-dom';


class ConsultaProdutos extends Component {

    state = {
        produtos: [] 
    }

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const produtos = this.service.obterProdutos();
        this.setState({ produtos : produtos})
    }

    preparaEditar = (sku) => {
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    excluir = (sku) => {
        const produtos = this.service.excluir(sku)
        this.setState({ produtos: produtos})
    }

    render() {
        return (
            <div className="card border-primary">
                <div className="card-header">Consulta Produtos</div>
            
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">SKU</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Fornecedor</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.produtos.map( (p, index) => {
                            return (
                                <tr key={index}>
                                    <td>{p.nome}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.preco}</td>
                                    <td>{p.fornecedor}</td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={ () => this.preparaEditar(p.sku)}>Editar</button>
                                        <button className="btn btn-outline-danger" onClick={ () => this.excluir(p.sku)}>Excluir</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(ConsultaProdutos);