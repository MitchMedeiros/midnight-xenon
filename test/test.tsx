import React, { createContext, useContext, useReducer, useRef, useState } from "react";
import type { ChangeEvent, FC, ReactNode } from "react";
import { Button } from "./Button";

// Line comment
/* Block comment */

type Status = "idle" | "loading" | "error";

interface Item {
    readonly id: number;
    label: string;
    done?: boolean;
}

interface TodoListProps<T extends Item = Item> {
    title: string;
    items: T[];
    onSelect?: (item: T) => void;
    children?: ReactNode;
}

type Action =
    | { type: "add"; payload: Item }
    | { type: "toggle"; id: number }
    | { type: "clear" };

enum Filter {
    All = "all",
    Done = "done",
}

const ThemeContext = createContext<{ dark: boolean }>({ dark: true });

function reducer(state: Item[], action: Action): Item[] {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "toggle":
            return state.map((item) => (item.id === action.id ? { ...item, done: !item.done } : item));
        default:
            return [];
    }
}

/**
 * Generic list component.
 * @template T - Item type rendered by the list.
 */
export function TodoList<T extends Item>({ title, items, onSelect, children }: TodoListProps<T>) {
    const [status, setStatus] = useState<Status>("idle");
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [state, dispatch] = useReducer(reducer, items);
    const inputRef = useRef<HTMLInputElement>(null);
    const { dark } = useContext(ThemeContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setStatus(event.target.value ? "loading" : "idle");
    };

    const visible = state.filter((item) => filter === Filter.All || item.done) as T[];

    return (
        <section className={dark ? "dark" : "light"} aria-busy={status === "loading"}>
            {/* JSX comment */}
            <h1>{title}</h1>
            <input ref={inputRef} type="text" onChange={handleChange} defaultValue="" />
            <ul>
                {visible.map((item) => (
                    <li key={item.id} onClick={() => onSelect?.(item)}>
                        {item.label}
                        {item.done && <span> (done)</span>}
                    </li>
                ))}
            </ul>
            <Button<string> variant="primary" onClick={() => dispatch({ type: "clear" })}>
                Clear all
            </Button>
            {children}
        </section>
    );
}

const Badge: FC<{ count: number }> = ({ count }) => <span className="badge">{count}</span>;

const identity = <T,>(value: T): T => value;

interface CardProps {
    id: number;
    children?: ReactNode;
    onClose?: () => void;
}

const Card: FC<CardProps> = ({ children, id, onClose }) => (
    <React.Fragment key={id}>
        <article
            data-id={id}
            aria-label="Card"
            tabIndex={0}
            hidden={false}
            style={{
                color: "#22adf8",
                backgroundColor: "rgb(34 173 248 / 50%)",
                padding: `${id}px calc(1rem * 2)`,
                "--accent": "hsl(200deg 90% 55%)",
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: "<b>bold</b>" }}
        >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use xlink:href="#icon" fill="currentColor" />
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
            {children}
            <input type="checkbox" disabled checked onChange={(e: ChangeEvent<HTMLInputElement>) => onClose?.()} />
            <a href="https://example.com" target="_blank" rel="noreferrer">
                Link &copy; 2025
            </a>
        </article>
    </React.Fragment>
);

export default function App(): JSX.Element {
    const items: Item[] = [{ id: 1, label: "Write tests" }];
    return (
        <ThemeContext.Provider value={{ dark: true }}>
            <TodoList title="Tasks" items={items} />
            <Badge count={items.length} />
        </ThemeContext.Provider>
    );
}
