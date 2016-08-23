library(shiny)
library(forceMap)
library(shinydashboard)

shinyUI(fluidPage(
  forceMapOutput('map'),
  sliderInput('proj', 'Map Projection Scale', min=300, max=3000, value=1500),
  sliderInput('minRad', 'Minimum Circle Radius', min=5, max=100, value=10),
  sliderInput('maxRad', 'Maximum Circle Radius', min=10, max=200, value=40)
  )
)