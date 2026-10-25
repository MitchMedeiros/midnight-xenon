#!/usr/bin/env bash

# Line comment
set -euo pipefail

readonly VERSION="1.2.3"
declare -a FILES=("a.txt" "b.txt" 'c d.txt')
declare -A COLORS=([red]="#ff0000" [blue]="#0000ff")
COUNT=0
export PATH="$HOME/bin:$PATH"
alias ll='ls -la'

usage() {
    echo "Usage: $0 [-v|--verbose] [-n <count>] <file>..."
    exit 1
}

# Compute a value from the arguments
add() {
    local a=${1:?"First param not set"}
    local b="${2:-0}"
    echo $((a + b))
}

main() {
    local verbose=false
    while getopts ":vn:" opt; do
        case "$opt" in
            v) verbose=true ;;
            n) COUNT="$OPTARG" ;;
            *) usage ;;
        esac
    done
    shift $((OPTIND - 1))

    if [[ $# -lt 1 ]]; then
        usage
    elif [[ -f "$1" && ! -L "$1" ]] || [ -d "$1" ]; then
        echo "found: $1"
    else
        echo "missing: $1" >&2
    fi

    for file in "${FILES[@]}"; do
        [[ "$file" =~ ^[a-z]+\.txt$ ]] && echo "match ${file%.txt} ${#file}"
    done

    for ((i = 0; i < COUNT; i++)); do
        echo "iteration $i"
    done

    until [ "$COUNT" -le 0 ]; do
        COUNT=$((COUNT - 1))
    done

    result=$(grep -rn --include="*.sh" -e "TODO" . | sort -u | wc -l)
    echo "`date +%F` -> $result items, pid $$, status $?"

    cat <<EOF
Heredoc with $VERSION and $(whoami)
EOF

    cat <<'EOF'
Quoted heredoc with $NOT_EXPANDED
EOF

    diff <(ls dir1) <(ls dir2) > /dev/null 2>&1 &
    curl -sSL --fail -o out.txt "https://example.com/file" || echo "failed"
    ls -la --color=auto *.txt ~/Documents
}

trap 'echo "cleanup"; exit' INT TERM

main "$@"
