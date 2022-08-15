import React, { useEffect } from 'react';
import './Tabs.css';

export const Tabs = (props) => {
    const active = props?.activeIndex ? props.tabs?.[props?.activeIndex]?.id : props.tabs[0].id;
    const [activeTabId, setActiveTab] = React.useState(active);

    const activeTab = React.useMemo(() => (
        props.tabs.find((tab) => (
            tab.id === activeTabId
        ))
    ), [activeTabId, props.tabs]);

    useEffect(() => {
        setActiveTab(active);
    }, [active]);

    return (

        <div className="tabs">
            <Navigation
                tabs={props.tabs}
                onNavClick={setActiveTab}
                activeTabId={activeTabId}
            />
            <Tab tab={activeTab} />
        </div>
    );
};

const Tab = (props) => (
    <div className="tabs__content">
        <h3>{props.tab.title}</h3>
        <p>{props.tab.text}</p>
    </div>
);

const Navigation = (props) => (
    <ul className="tabs__nav">
        {props.tabs.map((item) => (
            <li key={item.id} className="tabs__item">
                <button
                    className={`tabs__button ${(props.activeTabId === item.id) ? 'active' : ''}`}
                    onClick={() => props.onNavClick(item.id)}
                >
                    {item.name}
                </button>
            </li>
        ))}
    </ul>
);
