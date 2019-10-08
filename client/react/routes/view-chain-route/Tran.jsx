import React, {Fragment} from "react";
import moment from "moment";

export class Tran extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: false
        };
    };
    render(){
        let {show} = this.state;
        let {tran} = this.props;
        return(
            (
                <Fragment  >
                    <div className="info-block">
                        <span className="label">Transaction hash</span>
                        <span className="value">{tran.id}</span>
                    </div>
                    {this.state.show && (
                        <>
                            <div className="info-block" >
                                <span className="label">Hash</span>
                                <span className="value">{tran.id}</span>
                            </div>
                            <div className="info-block" >
                                <span className="label">So giay chung nhan</span>
                                <span className="value">{tran.noteNumber}</span>
                            </div>
                            <div className="info-block" >
                                <span className="label">Ngay cap</span>
                                <span className="value">{moment(tran.createdDate).format("MM/DD/YYYY")}</span>
                            </div>
                            <div className="info-block" >
                                <span className="label">To chuc cap</span>
                                <span className="value">{tran.org}</span>
                            </div>
                            <div className="info-block" >
                                <span className="label">Loai san pham</span>
                                <span className="value">{tran.category}</span>
                            </div>
                            <div className="info-block" >
                                <span className="label">Ngay het han</span>
                                <span className="value">{moment(tran.outdateDate).format("MM/DD/YYYY")}</span>
                            </div>
                        </>
                    )}
                    <p className="more" onClick={(e) => {
                        e.stopPropagation();
                        this.setState({show: !show})
                    }}>{show ? "Show less" : "Show more"}</p>

                </Fragment>
            )
        );
    }
}