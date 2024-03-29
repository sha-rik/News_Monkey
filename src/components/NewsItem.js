import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgurl, newsurl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                {/* news item component ,news component ke andar h */}
                <div className="card" style={{ borderRadius: "22px" }}>
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{}}>
                        {!source ? "Unknown" : source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={!imgurl ? "https://support.rebrandly.com/hc/article_attachments/360020801793/rebrandly_url_shortener_010.png" : imgurl} className="card-img-top" alt="ye bhi thik h" />
                    <div className="card-body">
                        {/* span ke tag se hame badges mil raha h.. */}
                        <h5 className="card-title">{title}....</h5>
                        <p className="card-text">{description}....</p>

                        {/* iska use ham author aur date lane me karenge + ham date to gmt me convert bhi kar denge */}
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {!date ? "Unknown" : new Date(date).toGMTString()}</small></p>

                        {/* target="_blank" aishe lickne se new tab me open hoga */}
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-danger btn-sm">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
