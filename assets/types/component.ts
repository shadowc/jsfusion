export interface IComponent {
    element: Element;
}

export interface IComponentClass {
    new(element: Element): IComponent;
}
