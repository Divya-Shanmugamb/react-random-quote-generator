import React, { Component } from 'react';
import './App.css';
import Quote from './Quote/Quote';

class App extends Component {
  
  authors = ['Giuseppe','Paola','Alan','Mirian','Cristina','Marcos','Laura','Guilherme','Gabriel']
  quotes = ['PALAVRA1', 'PALAVRA2', 'PALAVRA3', 'PALAVRA4', 'PALAVRA5', 'PALAVRA6', 'PALAVRA7']

  state = {
    generatedQuote: {
      id: 0, 
      author: '', 
      date: '',
      quote: '' 
    },
    savedQuotes: [],
    showSavedQuotes: true,
    isAlreadySaved: true,
  }
  
  randomizeQuoteHandler = () => {

    const randomAuthorIndex = Math.floor(Math.random() * this.authors.length);
    const randomQuoteIndex = Math.floor(Math.random() * this.quotes.length);
    
    const randomAuthor = this.authors[randomAuthorIndex];
    const randomDate = Math.floor(Math.random() * 100) + 1;
    const randomQuote = this.quotes[randomQuoteIndex];

    this.setState({
      generatedQuote: {
        author: randomAuthor,
        date: randomDate,
        quote: randomQuote
      },
      isAlreadySaved: false
    });
  }

  generateUniqueQuoteId = () => {
    return this.state.savedQuotes.length + 1;
  }

  saveQuoteHandler = () => {
    const quote = {...this.state.generatedQuote};
    quote.id = this.generateUniqueQuoteId();

    const quotes = [...this.state.savedQuotes];
    quotes.push(quote);

    this.setState({ 
      savedQuotes: quotes,
      isAlreadySaved: true 
    });
  }


  removeSavedQuoteHandler = (index) => {

    const quotes = [...this.state.savedQuotes];
    quotes.splice(index, 1);
    this.setState({ savedQuotes: quotes });
  }

  toggleQuotesHandler = () => {
    
    const actualShowState = this.state.showSavedQuotes;
    this.setState({ showSavedQuotes: !actualShowState });
  }

  render() {

    const style = {
      margin: '15px'
    };

    const style2 = {
      marginTop: '25px'
    };

    // OutSource Condition
    let savedQuotes = null;

    if (this.state.showSavedQuotes && this.state.savedQuotes.length > 0) {

      savedQuotes = (
        <div style={style}>
          {this.state.savedQuotes.map((el, i) => {
            return <Quote 
                    key = {el.id}
                    author={el.author} 
                    date={el.date}
                    remove={this.removeSavedQuoteHandler.bind(this, i)}>{el.quote}</Quote>
          })}
        </div>
      );

    } else if (this.state.savedQuotes.length === 0) {
      savedQuotes = (
        <p>No Quotes Saved</p>
      );
    }
    

    return (
      <div className="App">

        <h1>Random Quote Generator</h1>
        
        <div style={style}>
          <Quote author={this.state.generatedQuote.author}
                  date={this.state.generatedQuote.date}>
            {this.state.generatedQuote.quote}
          </Quote>
        </div>

        {/* Buttons */}
        <div>
          <button onClick={this.saveQuoteHandler} disabled={this.state.isAlreadySaved}>
            Save Quote
          </button>
          <button onClick={this.randomizeQuoteHandler}>
            Randomize It
          </button>
          <button onClick={this.toggleQuotesHandler}>
            {/* Condition With Ternary OP */}
            {(this.state.showSavedQuotes) ? 'Hide Bookmark' : 'Show Bookmark'}
          </button>
        </div>

        {/* OutSouce Conditions Result */}
        {/* List Multiple Quotes */}
        <div style={style2}>
          {savedQuotes}
        </div>

      </div>
    );
  }
}

export default App;