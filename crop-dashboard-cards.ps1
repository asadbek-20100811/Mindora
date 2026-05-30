Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourcePath = Join-Path $root "assets\dashboard-cards-source.png"

if (-not (Test-Path -LiteralPath $sourcePath)) {
  throw "Source screenshot not found: assets\dashboard-cards-source.png"
}

$outDir = Join-Path $root "assets"
$source = [System.Drawing.Image]::FromFile($sourcePath)

try {
  $scaleX = $source.Width / 1070
  $scaleY = $source.Height / 502
  $cards = @(
    @{ Name = "card-lessons.png"; X = 4;   Y = 8;   W = 259; H = 237 },
    @{ Name = "card-memory.png"; X = 273; Y = 9;   W = 258; H = 238 },
    @{ Name = "card-premium.png"; X = 542; Y = 9;  W = 258; H = 238 },
    @{ Name = "card-statistics.png"; X = 811; Y = 9; W = 258; H = 238 },
    @{ Name = "card-planner.png"; X = 4;  Y = 258; W = 259; H = 238 },
    @{ Name = "card-leaderboard.png"; X = 273; Y = 258; W = 258; H = 238 },
    @{ Name = "card-progress.png"; X = 542; Y = 258; W = 258; H = 238 },
    @{ Name = "card-achievement.png"; X = 811; Y = 258; W = 258; H = 238 }
  )

  foreach ($card in $cards) {
    $rect = New-Object System.Drawing.Rectangle(
      [int][Math]::Round($card.X * $scaleX),
      [int][Math]::Round($card.Y * $scaleY),
      [int][Math]::Round($card.W * $scaleX),
      [int][Math]::Round($card.H * $scaleY)
    )
    $bitmap = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($source, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $target = Join-Path $outDir $card.Name
    $bitmap.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
    Write-Host "Saved $($card.Name)"
  }
}
finally {
  $source.Dispose()
}
