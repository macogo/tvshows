import React, { createContext, useState, useMemo } from 'react';

//create context
const pageContext = () => {
    const store = createContext<any>({});
    let storeState, setState: (arg0: (prevState: any) => any) => void, setPageData;
    // Provider
    const PageProvider = (props: { initialState?: any; children: any; }) => {
        const { initialState, children } = props;
        [storeState, setState] = useState(initialState);

        setPageData = (states: any) => {

            setState(prevState => {
                return { ...prevState, ...states };
            });
        };
        // shared context for component tree
        const context = {
            storeState,
            setPageData,
        };
        return useMemo(() => {
            return <store.Provider value={context}>{children}</store.Provider>;
        }, [context]);
    };

    return { store, PageProvider };
}

export default pageContext;

const { store, PageProvider } = pageContext();

export { store, PageProvider };