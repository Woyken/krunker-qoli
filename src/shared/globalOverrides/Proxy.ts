const LocalProxy = Proxy;

function CustomProxy<T extends object>(target: T, handler: ProxyHandler<T>) {
    return new LocalProxy(target, handler);
}

CustomProxy.revocable = Proxy.revocable.bind(Proxy);

export default CustomProxy;
