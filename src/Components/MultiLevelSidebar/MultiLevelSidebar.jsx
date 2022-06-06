import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './MultiLevelSidebar.css';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: [],
        };
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackdropClick() {
        const { onToggle, onClose, persist } = this.props;

        onToggle(false);
        onClose && onClose();
        if (!persist) {
            setTimeout(() => {
                this.setState({ activeTab: [] });
            }, 501);
        }
    }

    handleTabClick(tabData) {
        if (tabData.disabled) {
            return;
        }
        const { onItemClick } = this.props;

        if (tabData.children) {
            const data = [...this.state.activeTab];

            data.push(tabData.id);
            this.setState({ activeTab: data });
        }
        onItemClick && onItemClick(tabData);
    }

    handleBackClick(tabData) {
        const { onBackClick } = this.props;

        if (tabData) {
            const data = [...this.state.activeTab];
            const index = data.findIndex((id) => id === tabData.id);

            data.splice(index, 1);
            this.setState({ activeTab: data });
        } else {
            this.setState({ activeTab: [] });
        }
        onBackClick && onBackClick();
    }

    getParentHeight() {
        const parent = document.querySelector('#sidebar-parent');

        return parent ? parent.scrollHeight : '100vh';
    }

    renderSecondChildren(parent, list) {
        const { wrapperClassName } = this.props;
        const { activeTab } = this.state;

        return (
            <SidebarContent
                {...this.props}
                sidebarProps={{
                    className: classNames('sidebar-main second', {
                        show: activeTab.includes(list.id),
                        [wrapperClassName]: wrapperClassName,
                    }),
                    style: { height: this.getParentHeight() },
                }}
                headerContent={(
                    <>
                        <div
                            className="first-back-btn"
                            onClick={() => this.handleBackClick()}
                        >
                            <AngleLeft />
                            <span>{parent.name}</span>
                        </div>
                        <div
                            className="second-back-btn"
                            onClick={() => this.handleBackClick(list)}
                        >
                            <AngleLeft />
                            <span>{list.name}</span>
                        </div>
                    </>
                )}
                options={list.children}
                handleTabClick={this.handleTabClick}
            />
        );
    }

    renderFirstChildren(list) {
        const { wrapperClassName } = this.props;
        const { activeTab } = this.state;

        return (
            <SidebarContent
                {...this.props}
                sidebarProps={{
                    className: classNames('sidebar-main second', {
                        show: activeTab.includes(list.id),
                        [wrapperClassName]: wrapperClassName,
                    }),
                    style: { height: this.getParentHeight() },
                }}
                headerContent={(
                    <div
                        className="first-back-btn"
                        onClick={() => this.handleBackClick()}
                    >
                        <AngleLeft />
                        <span>{list.name}</span>
                    </div>
                )}
                options={list.children}
                handleTabClick={this.handleTabClick}
            >
                {(data) => data.children && this.renderSecondChildren(list, data)}
            </SidebarContent>
        );
    }

    render() {
        const {
            open,
            wrapperClassName,
            headerClassName,
            header,
            options,
        } = this.props;

        return (
            <div id="react-sidebar" className="slidebar">
                <div
                    className={classNames('sidebar-backdrop', { show: open })}
                    onClick={this.handleBackdropClick}
                />
                <SidebarContent
                    {...this.props}
                    sidebarProps={{
                        id: 'sidebar-parent',
                        className: classNames('sidebar-main', {
                            show: open,
                            [wrapperClassName]: wrapperClassName,
                        }),
                    }}
                    headerContent={
                        typeof header === 'string' ? (
                            <div
                                className={`sidebar-header ${classNames({
                                    [headerClassName]: headerClassName,
                                })}`}
                            >
                                {header}
                            </div>
                        ) : (
                            <div
                                className={classNames({
                                    [headerClassName]: headerClassName,
                                })}
                            >
                                {header}
                            </div>
                        )
                    }
                    options={options}
                    handleTabClick={this.handleTabClick}
                >
                    {(list) => list.children && this.renderFirstChildren(list)}
                </SidebarContent>
            </div>
        );
    }
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.node,
    ]),
    persist: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    onClose: PropTypes.func,
    onItemClick: PropTypes.func,
    onBackClick: PropTypes.func,
};

Sidebar.defaultProps = {
    persist: false,
};

export default Sidebar;

const SidebarContent = (props) => {
    const {
        sidebarProps,
        headerContent,
        options,
        children,
        handleTabClick,
    } = props;

    return (
        <div {...sidebarProps}>
            <div className="sidebar-main-content">
                {headerContent}
                <div className="sidebar-body">
                    {options.map((data, index) => (
                        <Fragment key={index}>
                            {!(!!data.hideBorder || index === 0) && (
                                <hr className="section-seprator" />
                            )}
                            {data.title && (
                                <div className="section-heading">
                                    {data.titleIcon && data.titleIcon}
                                    <span className={classNames({ text: data.titleIcon })}>
                                        {data.title}
                                    </span>
                                </div>
                            )}
                            {data.element || (
                                <ul>
                                    {data.content.map((list, index) => (
                                        <Fragment key={index}>
                                            {list.to && !list.children && !list.disabled ? (
                                                <a href={list.to}>
                                                    <li
                                                        className={classNames({
                                                            disabled: list.disabled,
                                                        })}
                                                        onClick={() => handleTabClick(list)}
                                                    >
                                                        <span className="flex-align-center">
                                                            {list.icon && list.icon}
                                                            <span>{list.name}</span>
                                                        </span>
                                                        {children && list.children && <AngleRight />}
                                                    </li>
                                                </a>
                                            ) : (
                                                <li
                                                    className={classNames({ disabled: list.disabled })}
                                                    onClick={() => handleTabClick(list)}
                                                >
                                                    <span className="flex-align-center">
                                                        <span>{list.name}</span>
                                                        {list.icon && list.icon}
                                                    </span>
                                                    {children && list.children && <AngleRight />}
                                                </li>
                                            )}
                                            {children && children(list)}
                                        </Fragment>
                                    ))}
                                </ul>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AngleRight = (props) => (
    <svg
        width="12px"
        height="12px"
        viewBox="0 0 8 13"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <title>Icon</title>
        <desc>Created with Sketch.</desc>
        <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Icon/Arrow/Right/Gray" fill="#898989">
                <g id="icon/Arrow/Right/Gray">
                    <polygon
                        id="Icon"
                        points="0 11.4725 4.94466937 6.5 0 1.5275 1.52226721 0 8 6.5 1.52226721 13"
                    />
                </g>
            </g>
        </g>
    </svg>
);

const AngleLeft = (props) => (
    <svg
        width="12px"
        height="12px"
        viewBox="0 0 8 13"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ transform: 'rotate(180deg)' }}
    >
        <title>Icon</title>
        <desc>Created with Sketch.</desc>
        <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Icon/Arrow/Right/Gray" fill="#898989">
                <g id="icon/Arrow/Right/Gray">
                    <polygon
                        id="Icon"
                        points="0 11.4725 4.94466937 6.5 0 1.5275 1.52226721 0 8 6.5 1.52226721 13"
                    />
                </g>
            </g>
        </g>
    </svg>
);
