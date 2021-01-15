import React, { Component } from 'react';

import Header from './Header';
import SideBar from './SideBar';

import 'bootstrap/bootstrap.min.css';
import './style.css';

const Layout = (WrappedComponent) => (
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isSidebarOpen: false,
            };
        }

        toggleSidebar = () => (
            this.setState(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen }))
        );

        render() {
            const { isSidebarOpen } = this.state;

            return (
                <div className="container-fluid">
                    <div className="row">
                        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={this.toggleSidebar} />
                        <SideBar isSidebarOpen={isSidebarOpen} />
                        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <WrappedComponent {...this.props} />
                        </main>
                    </div>
                </div>
            );
        }
    }
);

export default Layout;
