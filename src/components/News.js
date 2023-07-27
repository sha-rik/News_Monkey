import React, { Component } from 'react'
// why is this showing an error sign
import Spinner from './Spinner'
// 
// impt se props types import hote h
import PropTypes from 'prop-types'

import NewsItem from './NewsItem'

import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  // 1....... ye kion likha... samajh nahi aaya
  static defaultProp = {
    country: "in",
    pageSize: 8,
    catogary: "general",
  }
  // 2..... ye kya h...aur isse kya hota h??
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    catogary: PropTypes.string,
  }
  // mene api call ki aur mere pass kitna response aaya ye jaise pata lagega??

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    console.log("Hello world")
    // tumne jis chij ko state me set kiya h... tum usko dynamically change kar sakte ho
    // propes ko ham dynamically change nahi kar sakte h
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.catogary)} - News Monkey`;
  }
  // jab render method run ho jayega tab componentDidMount run hoga
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catogary}&apiKey=a26093c772284f8b8a5411a78b74aaf4&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // jab hamne url ko hit kiya to fir hamne Spinner show kiya
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      // aur jab hamare paas api ka responce aa gaay to fir hamne Spinner ho hata diya
      loading: false
    })
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catogary}&apiKey=a26093c772284f8b8a5411a78b74aaf4&page=1&pageSize=${this.props.pageSize}`;

    // // jab hamne url ko hit kiya to fir hamne Spinner show kiya
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   // aur jab hamare paas api ka responce aa gaay to fir hamne Spinner ho hata diya
    //   loading: false
    // })
    this.updateNews();
  }

  // ye function next pag par jata h... par jab artcle over ho jata h to fir blank page show karta h
  // to isse bachne ke liye ham NEWS API KA pagesize parameter ka use karenge....
  // agar pagesize to n rakhoge to fir har page me tumko sirf n article hi show honge


  // handlenextclick = async () => {
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catogary}&apiKey=a26093c772284f8b8a5411a78b74aaf4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

  //   //   // jab hamne url ko hit kiya to fir hamne Spinner show kiya
  //   //   this.setState({ loading: true });

  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();


  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     // ye pata nahi kion diya h..anupam se pucho
  //   //     articles: parsedData.articles,
  //   //     // aur jab hamare paas api ka responce aa gaay to fir hamne Spinner ho hata diya
  //   //     loading: false
  //   //   })
  //   // }
  //   this.setState({page : this.state.page+1})
  //   // we have to use this ... as we are inside a class
  //   this.updateNews();

  // }


  // handleprevclick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catogary}&apiKey=a26093c772284f8b8a5411a78b74aaf4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // // jab hamne url ko hit kiya to fir hamne Spinner show kiya
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   // ye pata nahi kion diya h..anupam se pucho
  //   //   articles: parsedData.articles,
  //   //   // aur jab hamare paas api ka responce aa gaay to fir hamne Spinner ho hata diya
  //   //   loading: false
  //   // })

  //   // ab hamne ek function banaya h... aur ham ab page number ko change kar ke function ko call kar rahe h...
  //   this.setState({page : this.state.page - 1})
  //   this.updateNews();
  // }

  // all code for infinete scroll
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catogary}&apiKey=a26093c772284f8b8a5411a78b74aaf4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    
    this.setState({ page: this.state.page + 1 })
    // jab hamne url ko hit kiya to fir hamne Spinner show kiya
    // hamne yahan spinner ko comment out kar diya...as ham spinner ko infinite scrool wale component se dikha rahe h
    // this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      // artical me aishe karne se hamare article me concatinate ho jayega
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // aur jab hamare paas api ka responce aa gaay to fir hamne Spinner ho hata diya
      // loading: false
    })
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" ,marginTop:"90px"}}>News Monkey-Top headlines on {this.capitalizeFirstLetter(this.props.catogary)}</h1>

        {/* niche wala syntax says that.... agar loading true h to fir Spinner ko show karo nahi to mat karo */}
        {this.state.loading && <Spinner />}
        {/* <Spinner /> */}
        {/* news item component ,news component ke andar h */}

        {/* for infinite scrool */}
        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container my-3'>
            <div className="row">

              {this.state.articles.map((ele) => {
                return <div className='col-md-4' key={ele.url}>
                  <NewsItem title={ele.title ? ele.title.slice(0, 25) : ""} description={ele.description ? ele.description.slice(0, 30) : ""} imgurl={ele.urlToImage ? ele.urlToImage : ""} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* Now when when we are using an infinet scroll ... we do not need function related to pages */}
        {/* <div className='container mx-3 d-flex justify-content-between'> */}
        {/* since hamloog class based component likh rahe h... to hame koi bhi fun ko call karna hoga to this. karke call karna hoga */}
        {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-warning mx-3" onClick={this.handleprevclick}>&#8617; Prev</button> */}
        {/* <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning mx-3" onClick={this.handlenextclick}>Next &#8618;</button> */}
        {/* </div> */}

      </>
    )
  }
}

export default News
