import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import * as Icons from "./icons";

// Line comment
/* Block comment */

const MAX_ITEMS = 10;

/**
 * Renders a list of items with a counter.
 * @param {object} props - Component props.
 */
function TodoList({ items = [], title, onSelect, ...rest }) {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState("");

    useEffect(() => {
        document.title = `${title} (${count})`;
        return () => {
            document.title = "";
        };
    }, [title, count]);

    const visible = useMemo(
        () => items.filter((item) => item.label.includes(query)).slice(0, MAX_ITEMS),
        [items, query]
    );

    const handleClick = useCallback(
        (event) => {
            event.preventDefault();
            setCount((previous) => previous + 1);
            onSelect?.(event.target.value);
        },
        [onSelect]
    );

    if (!items.length) {
        return <p className="empty">Nothing to show</p>;
    }

    return (
        <section id="todo" className="todo-list" data-count={count} {...rest}>
            {/* JSX comment */}
            <h1 style={{ color: "#22adf8", margin: 0 }}>{title}</h1>
            <input
                type="text"
                value={query}
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                disabled
            />
            <ul>
                {visible.map((item, index) => (
                    <li key={item.id} className={index % 2 === 0 ? "even" : "odd"}>
                        {item.label} &mdash; {item.done ? <Icons.Check size={16} /> : null}
                    </li>
                ))}
            </ul>
            {count > 0 && <span>Clicked {count} times</span>}
            <Button variant="primary" onClick={handleClick}>
                Add &amp; Count
            </Button>
            <>
                <br />
                <small>Fragment content with "quotes" and 'apostrophes'</small>
            </>
        </section>
    );
}

TodoList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, label: PropTypes.string })),
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
};

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError ? <h2>Something went wrong</h2> : this.props.children;
    }
}

const Card = ({ children, id, onClose }) => (
    <React.Fragment key={id}>
        <article
            data-id={id}
            aria-label="Card"
            tabIndex={0}
            hidden={false}
            style={{
                color: "#22adf8",
                backgroundColor: "rgb(34 173 248 / 50%)",
                padding: `${MAX_ITEMS}px calc(1rem * 2)`,
                "--accent": "hsl(200deg 90% 55%)",
            }}
            dangerouslySetInnerHTML={{ __html: "<b>bold</b>" }}
        >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use xlink:href="#icon" fill="currentColor" />
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
            {children}
            <input type="checkbox" disabled checked onChange={() => onClose?.()} />
            <a href="https://example.com" target="_blank" rel="noreferrer">
                Link &copy; 2025
            </a>
        </article>
    </React.Fragment>
);

const App = () => (
    <ErrorBoundary>
        <TodoList title="Tasks" items={[{ id: 1, label: "Write tests", done: false }]} />
    </ErrorBoundary>
);

export default App;
