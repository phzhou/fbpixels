var _catalog = {
  'ps4': {
    name: 'PlayStation 4',
    type: 'Game Console',
    description: 'PlayStation 4 redefines rich and immersive gameplay with ' +
      'powerful graphics and speed, intelligent personalization, deeply ' +
      'integrated social capabilities, and innovative second-screen features.',
    image: '/static/images/ps4.jpg',
    price: 399,
  },
  'xbox': {
    name: 'Xbox One',
    type: 'Game Console',
    description: 'Next generation game console from Microsoft.',
    image: '/static/images/xbox.jpg',
    price: 399,
  },
  '3ds': {
    name: 'Nintendo 3DS XL',
    type: 'Game Console',
    description: 'Best Nintendo portable console ever.',
    image: '/static/images/3ds.jpg',
    price: 199,
  }
};

var ProductView = React.createClass({

  onAddToCart: function() {
    if (typeof this.props.onAddToCart === 'function') {
      this.props.onAddToCart();
    }
  },

  onAmountChange: function(e) {
    if (typeof this.props.onAmountChange === 'function') {
      this.props.onAmountChange(parseInt(e.target.value));
    }
  },

  render: function() {
    var product = _catalog[this.props.productId];
    var amount = this.props.amount;
    return (
      <div className="product row">
        <img className="product-image col-md-6" src={product.image}/>
        <div className="product-detail col-md-6">
          <h1 className="name">{product.name}</h1>
          <p className="description">{product.description}</p>
          <h2 className="price">Price: ${product.price}</h2>
          <div className="form">
            <div className="form-group">
              <label for="amount">Amount:</label>
              <select id="amount" className="form-control"
                  onChange={this.onAmountChange}>
                {[1,2,3,4,5].map(function(i){
                  return (<option value={i} selected={amount == i}>{i}</option>);
                })}
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-success" type="button"
                  onClick={this.onAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

var ProductSelect = React.createClass({
  onProductChange: function(e) {
    if (typeof this.props.onProductChange === 'function') {
      this.props.onProductChange(e.target.value);
    }
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 form-inline">
          <label for="product-select">Select Product:</label>
          <select id="product-select" className="form-control"
              onChange={this.onProductChange}>
            {Object.keys(_catalog).map(function(key){
              return (<option value={key}>{_catalog[key].name}</option>);
            })}
          </select>
        </div>
      </div>
    );
  }
});

var CartView = React.createClass({
  onRemove: function(productId) {
    if (typeof this.props.onRemove === 'function') {
      this.props.onRemove(productId);
    }
  },

  onPurchase: function() {
    if (typeof this.props.onPurchase === 'function') {
      this.props.onPurchase();
    }
  },

  render: function() {
    var cart = this.props.cart;
    var self = this;
    var total = 0;
    {Object.keys(cart).map(function(productId) {
      var product = _catalog[productId];
      var amount = cart[productId];
      total += product.price * amount;
    })}
    return (
      <div className="cart">
        <div className="cart-header">
          <h2>Your current shopping cart:</h2>
        </div>
        <table className="table table-bordered table-striped cart-list">
          <thead>
            <tr>
              <td>Product</td>
              <td>Amount</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
          {Object.keys(cart).map(function(productId){
            var product = _catalog[productId];
            var amount = cart[productId];
            return (
              <tr key={productId}>
                <td className="product-name">
                  {product.name}
                </td>
                <td className="amount">
                  {amount}
                </td>
                <td className="price">
                  ${amount * product.price}
                </td>
                <td>
                  <button
                      className="btn btn-danger"
                      onClick={self.onRemove.bind(self, productId)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>${total}</td>
              <td>
                <button className="btn btn-success"
                  onClick={this.onPurchase}>Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
});

var CartApp = React.createClass({

  getInitialState: function() {
    return {
      productId: 'ps4',
      amount: 1,
      cart: {}
    };
  },

  onProductChange: function(id) {
    this.setState({
      productId: id
    });
    // Fire ViewContent event
    if (typeof reportViewContent === 'function') {
      reportViewContent([id]);
    }
  },

  onAmountChange: function(amount) {
    this.setState({
      amount: amount
    });
  },

  onAddToCart: function() {
    cart = this.state.cart;
    id = this.state.productId;
    amount = this.state.amount;

    if (typeof cart[id] === 'undefined') {
      cart[id] = amount;
    } else {
      cart[id] += amount;
    }
    this.setState({
      cart: cart
    });

    // Fire AddToCart event
    if (typeof reportAddToCart === 'function') {
      reportAddToCart([id]);
    }
  },

  onPurchase: function() {
    var cart = this.state.cart;
    var productIds = Object.keys(cart).map(function(productId){
      return productId;
    })
    // Fire Purchase event
    if (typeof reportPurchase === 'function') {
      reportPurchase([id]);
    }
    // Clear the current cart
    this.setState({
      cart: {}
    });
  },

  onRemove: function(productId) {
    console.log('Remove: ' + productId);
    cart = this.state.cart;
    delete cart[productId];
    this.setState({
      cart: cart
    });
  },

  render: function() {
    return (
      <div className="col-md-12">
        <ProductSelect
          onProductChange={this.onProductChange} />
        <ProductView
          productId={this.state.productId}
          amount={this.state.amount}
          onAmountChange={this.onAmountChange}
          onAddToCart={this.onAddToCart} />
        <CartView
          cart={this.state.cart}
          onRemove={this.onRemove}
          onPurchase={this.onPurchase} />
      </div>
    );
  }
});

React.render(
  <CartApp />,
  document.getElementById('shop-react')
);