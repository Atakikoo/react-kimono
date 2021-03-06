import React, { Fragment } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from "./home/home";
import ArticlesListContainer from "./articles/articles-list-container";
import ArticlesDisplay from "./articles/article-display"
import CVPage from "./cv/cv"

const AppContainer = () => {

  return (
    <Fragment>
      <Header />

      <div className="main-section">
        <Switch>
          <Redirect from='/' exact to='/home' />
          <Route path='/home' component={Home} />
          <Route path="/articles/category/:category" component={ArticlesListContainer} />
          <Route path="/articles/:id" component={ArticlesDisplay} />
          <Route path="/cv" component={CVPage} />
          <Route render={() => <div className="noMatch-404">404</div>} />
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AppContainer;
