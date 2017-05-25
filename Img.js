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

    dealWithSrc (forceSrc){
        let {src,loadingSrc,errorSrc,onError,onLoad} = this.props;

        forceSrc&&(src = forceSrc);

        if(loadingSrc){
            this.setState({
                src:loadingSrc
            })
        }
        const img = new Image();
        img.onload = () => {
            console.info(src);
            console.info(this.unmounted);
            if(!this.unmounted){
                console.info(src);
                this.setState({src:src});
                onLoad&&onLoad();
            }
        };

        img.onerror = () => {
            if(!this.unmounted){
                if(errorSrc){
                    this.setState({
                        src:errorSrc
                    })
                }
                onError&&onError();
            }
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
            this.dealWithSrc(nextProps.src);
        }
    }

    componentDidUpdate(){

    }

    componentWillUnmount(){
        this.unmounted = true;
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
