var BookItem = React.createClass({
  render: function () {
    return (
        <div className="book-item">
          <p className="name">{this.props.name}</p>
          <p className="ctime">{this.props.ctime}</p>
        </div>
    );
  }
});

var BookList = React.createClass({
  render: function () {
    var bookItems = this.props.data.map(function (element) {
      return (
          <BookItem name={element.title} ctime={element.created} />
      );
    });
    return (
        <div>
          {bookItems}
        </div>
    );
  }
});

var BookContent = React.createClass({
  getInitialState: function () {
    return ({data: []});
  },
  getResources: function () {
    $.getJSON(this.props.url, function (data) {
      this.setState({data: data});
    }.bind(this));
  },
  componentDidMount: function () {
    this.getResources();
  },
  render: function () {
    return (
        <div className="content">
          <BookList data={this.state.data}/>
        </div>
    );
  }
});

var SearchBox = React.createClass({
  getInitialState: function () {
    return {value:""}
  },
  handleChange: function (event) {
    this.setState({value:event.target.value});
    var text = $("#search-content").val();
    $("p").each(function(){
      var innerHtml = $(this)[0].innerHTML.replace(/<.*?>/ig,"");
      $(this)[0].innerHTML = innerHtml;
    });
    $(".content div div").show();
    var children = $(".content div div").children(".name").each(function(){
      var p_content = $(this).text();
      var reg = new RegExp("("+text+")","gi");
      if(p_content.match(reg)){
        $(this).html( $(this).html().replace(reg,"<span class='highlight'>$1</span>"));
      }
      else{
        $(this).parent().hide();
      }
    });
  },
  render: function(){
    return(
        <div className="search">
          <input id="search-content" type="text" onChange={this.handleChange} value={this.state.value} />
        </div>
    );
  }
});

ReactDOM.render(
    <div>
      <SearchBox />
      <BookContent url="../../resources/bookmarks.json"/>
    </div>,
    document.getElementById("display-context")
);