import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './modules/home/home';
import CadastroProdutos from './modules/produtos/cadastro';
import ConsultaProdutos from './modules/produtos/consulta';

export default () => {
    return (

        <Switch>
            <Route exact path="/cadastro-produtos/:sku?" component={CadastroProdutos} />
            <Route exact path="/consulta-produtos" component={ConsultaProdutos} />
            <Route exact path="/" component={Home} />
        </Switch>

    )
}