"""
The typing module: Support for gradual typing as defined by PEP 484 and subsequent PEPs.
"""

import re as stdlib_re  # Avoid confusion with the re we export.
import types
from abc import ABCMeta, abstractmethod
from collections import defaultdict
from types import (
    GenericAlias,
    MethodDescriptorType,
)

# Please keep __all__ alphabetized within each category.
__all__ = [
    "Annotated",
    "Type",
    "AbstractSet",  # collections.abc.Set.
]


class TestClass:
    def __init__(self, x: int, y: str, z: bool) -> types.NoneType:
        self.x = x
        self.y = y
        self.z = z


testing = TestClass(1, "hello", True)
print(testing.x)


def _type_repr(obj):
    if isinstance(obj, type):
        if obj.__module__ == "builtins":
            return obj.__qualname__
        return f"{obj.__module__}.{obj.__qualname__}"
    if obj is ...:
        return "..."
    if isinstance(obj, types.FunctionType):
        return obj.__name__
    if isinstance(obj, tuple):
        # Special case for `repr` of types with `ParamSpec`:
        return "[" + ", ".join(_type_repr(t) for t in obj) + "]"
    return repr(obj)


def _collect_parameters(args):
    parameters = []
    for t in args:
        if isinstance(t, type):
            pass
        elif isinstance(t, tuple):
            for x in t:
                for collected in _collect_parameters([x]):
                    if collected not in parameters:
                        parameters.append(collected)
        elif hasattr(t, "__typing_subst__"):
            if t not in parameters:
                parameters.append(t)
        else:
            for x in getattr(t, "__parameters__", ()):
                if x not in parameters:
                    parameters.append(x)
    return tuple(parameters)


def _check_generic(cls, parameters, elen):
    """Check correct count for parameters of a generic cls (internal helper).

    This gives a nice error message in case of count mismatch.
    """
    if not elen:
        raise TypeError(f"{cls} is not a generic class")
    alen = len(parameters)
    if alen != elen:
        raise TypeError(
            f"Too {'many' if alen > elen else 'few'} arguments for {cls};"
            f" actual {alen}, expected {elen}"
        )


def _unpack_args(args):
    newargs = []
    for arg in args:
        subargs = getattr(arg, "__typing_unpacked_tuple_args__", None)
        if subargs is not None and not (subargs and subargs[-1] is ...):
            newargs.extend(subargs)
        else:
            newargs.append(arg)
    return newargs


def _deduplicate(params, *, unhashable_fallback=False):
    # Weed out strict duplicates, preserving the first of each occurrence.
    try:
        return dict.fromkeys(params)
    except TypeError:
        if not unhashable_fallback:
            raise
        # Happens for cases like `Annotated[dict, {'x': IntValidator()}]`
        return _deduplicate_unhashable(params)


def _deduplicate_unhashable(unhashable_params):
    new_unhashable = []
    for t in unhashable_params:
        if t not in new_unhashable:
            new_unhashable.append(t)
    return new_unhashable


def _compare_args_orderless(first_args, second_args):
    first_unhashable = _deduplicate_unhashable(first_args)
    second_unhashable = _deduplicate_unhashable(second_args)
    t = list(second_unhashable)
    try:
        for elem in first_unhashable:
            t.remove(elem)
    except ValueError:
        return False
    return not t


def _should_unflatten_callable_args(typ, args):
    """
    For example::

        >>> import collections.abc
        >>> P = ParamSpec('P')
        >>> collections.abc.Callable[[int, int], str].__args__ == (int, int, str)
        True
        >>> collections.abc.Callable[P, str].__args__ == (P, str)
        True

    As a result, if we need to reconstruct the Callable from its __args__,
    we need to unflatten it.
    """
    return None
