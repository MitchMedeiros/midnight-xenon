List < Tuple > comments = entityManager.createNativeQuery(
    """
    SELECT
        pc.id AS id,
        pc.review AS review,
        p.title AS postTitle
    FROM post_comment pc
    JOIN post p ON pc.post_id = p.id
    """,
    Tuple.class
).getResultList();
for (Tuple comment: comments) { String review = (String) comment.get("review");
String postTitle = (String) comment.get("postTitle");
LOGGER.info(
    "The Post '{}' got this review '{}'",
    postTitle,
    review
);
}
SELECT pc.id AS id,
    pc.review AS review,
    p.title AS postTitle
FROM post_comment pc
    JOIN post p ON pc.post_id = p.id

-- Line comment
/* Block comment */

CREATE TABLE post (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NULL,
    author_id INT REFERENCES author (id) ON DELETE CASCADE,
    CONSTRAINT uq_title UNIQUE (title)
);

INSERT INTO post (id, title)
VALUES (1, 'First post'), (2, "Second post");

SELECT p.author_id, COUNT(*) AS total, MAX(p.id) AS latest
FROM post p
WHERE p.id IN (1, 2, 3) AND p.title LIKE '%post%' OR p.id > 10.5
GROUP BY p.author_id
HAVING COUNT(*) > 1
ORDER BY total DESC, p.author_id ASC
LIMIT 10;

SELECT DISTINCT a.name
FROM author a
    LEFT JOIN post p ON p.author_id = a.id
WHERE p.id IS NOT NULL;

UPDATE post SET title = 'Updated' WHERE id = 1;
DELETE FROM post WHERE id = 2;

BEGIN;
COMMIT;
ROLLBACK;

GRANT SELECT ON post TO reader;
REVOKE SELECT ON post FROM reader;

COMMENT ON TABLE post IS 'Blog posts';
