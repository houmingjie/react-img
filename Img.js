import React, { Component, PropTypes } from 'react'

function noop(){};

export default class Img extends Component{
    constructor(props){
        super(props);
        this.state = {
            src:props.placeholderSrc||props.src,
        };

        this.dealWithSrc = this.dealWithSrc.bind(this);
    }

    dealWithSrc (){
        const {src,loadingSrc,errorSrc,onError,onLoad} = this.props;
        if(loadingSrc){
            this.setState({
                src:loadingSrc
            })
        }
        const img = new Image();
        img.onload = () => {
            this.setState({src:src});
            onLoad&&onLoad();
        };

        img.onerror = () => {
            if(errorSrc){
                this.setState({
                    src:errorSrc
                })
            }
            onError&&onError();
        };

        img.src = src||"";//no src will trigger onError,just like browser default

        if(!src){
            this.setState({//no src no default img,just like browser default
                src:""
            });
        }
    }

    componentDidMount(){
        this.dealWithSrc();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.src !== this.props.src) {
            this.dealWithSrc();
        }
    }

    getElement(){
        return this.imgElement;
    }

    render(){
        return <img
                {...this.props}
                src={this.state.src}
                onError={noop}
                onLoad={noop}
                ref={ref => {this.imgElement = ref;}}
            />
    }
}


Img.propTypes = {
    src:PropTypes.string,
    placeholderSrc:PropTypes.string,
    loadingSrc:PropTypes.string,
    errorSrc:PropTypes.string,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
};
