# Line comment
<# Block comment #>

function Get-Greeting {
    param (
        [string]$Name = "World",
        [int]$Count = 1
    )

    for ($i = 0; $i -lt $Count; $i++) {
        Write-Output "Hello, $Name"
    }

    if ($?) {
        Write-Host "Last command succeeded"
    } else {
        Write-Host "Failed with $LASTEXITCODE"
    }
}

Get-Greeting -Name "Xenon" -Count 2
Get-ChildItem -Path . -Recurse | Where-Object { $_.Length -gt 1KB }
