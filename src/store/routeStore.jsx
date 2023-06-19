import create from 'zustand';

const routeStore = create((set, get) => ({
    route: false,
    setRoute: route => set(state => ({route: route})),
}));

export default routeStore;
