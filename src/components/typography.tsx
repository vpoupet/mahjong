type TypographyProps = {
    children: React.ReactNode;
    className?: string;
};

export function H1(props: TypographyProps) {
    return (
        <h1
            className={`scroll-m-20 text-4xl tracking-tight lg:text-5xl mt-6 first:mt-0 mb-6 ${props.className}`}
        >
            {props.children}
        </h1>
    );
}

export function H2(props: TypographyProps) {
    return (
        <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-4 first:mt-0 mb-4 ${props.className}`}
        >
            {props.children}
        </h2>
    );
}

export function H3(props: TypographyProps) {
    return (
        <h3
            className={`scroll-m-20 text-2xl font-semibold tracking-tight mt-4 first:mt-0 mb-4 ${props.className}`}
        >
            {props.children}
        </h3>
    );
}

export function H4(props: TypographyProps) {
    return (
        <h4
            className={`scroll-m-20 text-xl font-semibold tracking-tight mt-2 first:mt-0 mb-2 ${props.className}`}
        >
            {props.children}
        </h4>
    );
}

export function P(props: TypographyProps) {
    return (
        <p className={`leading-7 mt-4 first:mt-0 mb-4 ${props.className}`}>{props.children}</p>
    );
}
