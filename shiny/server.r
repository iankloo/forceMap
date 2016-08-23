library(shiny)
library(forceMap)

df <- forceMapSample

server <- function(input, output, session) {
  
  
  output$map <- renderForceMap({
    forceMap(df, minRadius=input$minRad, maxRadius=input$maxRad, projScale=input$proj)
  })
 
}