import Link from "next/link";

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <span>To Contact</span>
                    </div>

                    <div className="col-md-7">
                        <div className="get-touch">
                            <ul>
                                <li>
                                    <a>
                                        <i className="icon-phone4"></i> +91 98307 35480
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:enquiry@atlasfoundries.com">
                                        <i className="icon-mail"></i>enquiry@atlasfoundries.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
