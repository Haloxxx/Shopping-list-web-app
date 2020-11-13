import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import List from './lista.json';

function bought(e, idproduct)
{
    var product = {
        status: "bought"
    }

    var xhr = new XMLHttpRequest()

    xhr.open('PUT', 'http://127.0.0.1:5000/api/products/'+idproduct)
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify(product))

    alert("Usunięto");
    //event.preventDefault();
    window.location.reload();
}


function Rectangle(name, idproduct) {
    return (
        <button className="rectangle" key={idproduct} onClick={(e) => bought(e, idproduct)}>
            {name}
        </button>
    )
}

class NewProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
        //this.list_list_id = list_list_id;
        //this.user_user_id = user_user_id;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

        var product = {
            list_list_id: 4,
            user_user_id: 5,
            name: this.state.value
        }
        
        var xhr = new XMLHttpRequest()

        xhr.open('POST', 'http://127.0.0.1:5000/api/products')
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(product))

        //alert('A product was added: ' + this.state.value);
        alert('A product was added: ' + product.name);
        event.preventDefault();

        window.location.reload();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            
                <input type="text" className = "rectangle" value={this.state.value} onChange={this.handleChange} required/>
            
                <input type="submit" className = "plus" value="+"/>
            </form>
        );
    }
}

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.name = "Lista testowa";


        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
        
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/api/products_to_buy/4")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
            // nie w bloku catch(), aby nie przetwarzać błędów
            // mających swoje źródło w komponencie.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    

    render() {
        
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;
        } else {

            return (
                <div className="shopping-list">
                <h1>{this.name}</h1>
            
                {items.map(item => 
                Rectangle(item.name, item.idproduct))}
                
                <NewProduct/>
                {/*<Button/>*/}
                </div>
            );
        
        }
    }
}

//====================//
ReactDOM.render(
    <ShoppingList/>,// data={List}/>,
    document.getElementById('root')
)
