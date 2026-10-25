-- Line comment
--[[ Block comment ]]
--[==[ Long
block comment ]==]

local json = require("json")
local utils = require "utils"

local PI = 3.14159
local counter = 0
local hex, exp, float_hex = 0xff, 1.5e-3, 0x1p4
local nothing = nil
local enabled, disabled = true, false
local name = "xenon"
local single = 'single "quoted"'
local escaped = "tab\t newline\n unicode \u{00e9} hex \x41 dec \65"
local long = [[
multi-line string
]]
local nested = [==[ long ]] string ]==]
local names = { "a", "b", "c" }
local config = { retries = 3, verbose = true, ["key with space"] = 1, nested = { deep = 0 } }

local function add(a, b)
    return a + b
end

local function variadic(...)
    local args = { ... }
    return select("#", ...), #args
end

function globalFunction(x)
    return x * 2
end

function config.method(self, value)
    self.value = value
    return self
end

function config:describe()
    return string.format("%s has %d retries", name, self.retries)
end

local Shape = {}
Shape.__index = Shape

function Shape.new(name)
    local self = setmetatable({}, Shape)
    self.name = name
    return self
end

function Shape:area()
    error("Not implemented")
end

local Circle = setmetatable({}, { __index = Shape })
Circle.__index = Circle

function Circle.new(radius)
    local self = Shape.new("circle")
    self.radius = radius
    return setmetatable(self, Circle)
end

function Circle:area()
    return PI * self.radius ^ 2
end

local circle = Circle.new(3)
print(circle:area(), #names, names[1], config.nested.deep)

for i = 1, 10, 2 do
    if i % 2 == 0 and not (i > 5) then
        goto continue
    elseif i == 5 or i // 2 == 1 then
        break
    else
        counter = counter + i
    end
    ::continue::
end

for key, value in pairs(config) do
    print(key, value)
end

for index, item in ipairs(names) do
    print(index .. ": " .. item)
end

while counter > 0 do
    counter = counter - 1
end

repeat
    counter = counter + 1
until counter >= 3

local ok, err = pcall(function()
    error({ code = 1 })
end)

local result = (ok and "success") or "failure"
local bits = (1 << 4) | (0xff & 0x0f) ~ 3
local len = #"string" + math.floor(PI)

do
    local scoped <const> = 5
    local handle <close> = nil
end

return {
    add = add,
    Circle = Circle,
}
