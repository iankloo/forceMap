#' Create a d3 force directed map
#'
#' @param data A 2 column dataframe with a column called "names" with country names and another called "values" with the numeric values to be mapped.
#' @param nameType The format of the name in your "names" column.  Either countryName or iso3 is permitted.
#' @param minRadius A number for the minimum radius of the svg circles
#' @param maxRadius A number for the maximum radius of the svg circles
#' @param projScale A number for the scale of the map projection
#' @return A d3 force directed map
#' @examples
#' ##load sample data provided in package
#' df <- forceMapSample
#' forceMap(df, maxRadius = 45, projScale=1800)
#' 
#' @import htmlwidgets
#'
#' @export
forceMap <- function(data, nameType=c('countryName','iso3'), minRadius = 10, maxRadius = 40, projScale = 2000, width = NULL, height = NULL, elementId = NULL) {
  data <- data
  
  #checks on data
  if(is.data.frame(data) == FALSE){
    stop("data must be formatted as a data frame!")
  }
  
  if(is.null(data$names)){
    stop('data must include a column called "names"')
  }
  
  if(is.null(data$values)){
    stop('data must include a column called "values"')
  }
  
  if(is.numeric(data$values) == FALSE){
    stop('values column must be numeric')
  }
  
  suppressWarnings({
    if(nameType == 'iso3'){
      data$alias <- data$names
      data$lookup <- countrycode::countrycode(data$names, origin='iso3c', destination='iso2c')
      data$continent <- countrycode::countrycode(data$names, origin='iso3c', destination='region')
      data$names <- countrycode::countrycode(data$names, origin='iso3c', destination='country.name')
    } else if(nameType == 'countryName'){
      data$alias <- countrycode::countrycode(data$names, origin='country.name', destination='iso3c')
      data$lookup <- countrycode::countrycode(data$names, origin='country.name', destination='iso2c')
      data$continent <- countrycode::countrycode(data$names, origin='country.name', destination='region')
    } else{
      stop('please provide nameType of either "countryName" or "iso3"')
    }
  })
  
  data$continent <- gsub(' ','',data$continent)
  data$continent[is.na(data$continent)] <- 'unknown'
  
  #more checks
  if(length(which(is.na(data$alias))) > 0){
    badRows <- which(is.na(data$alias))
    stop(paste('row(s)',badRows,' - ',data$names[badRows], ' - cannot find country iso3 code', sep=''))
  }
  
  if(length(which(is.na(data$lookup))) > 0){
    badRows <- which(is.na(data$lookup))
    stop(paste('row(s)',badRows,' - ',data$names[badRows], ' - cannot find country iso2 code', sep=''))
  }
      
  geoNames <- geoNames
  
  for(i in 1:nrow(data)){
    if(length(geoNames$lat[data$lookup[i] == geoNames$iso2c]) == 0) {
      print(paste('error on line', i))
      data$lat[i] <-  NA
      data$lon[i] <-  NA
    } else{
      data$lat[i] <-  geoNames$lat[data$lookup[i] == geoNames$iso2c]
      data$lon[i] <-  geoNames$lon[data$lookup[i] == geoNames$iso2c]
    }
  }
  
  if(length(which(is.na(data$lat))) > 0){
    badRows <- which(is.na(data$lat))
    stop(paste('row(s)',badRows,' - ',data$names[badRows], ' - cannot find country lat/lon', sep=''))
  }
    
  #data <- data[is.na(data$lat) == FALSE,]

  dataJSON <- jsonlite::toJSON(data)
  
  options <- list(
    minRadius = minRadius,
    maxRadius = maxRadius,
    projScale = projScale)

  # create widget
  htmlwidgets::createWidget(
    name = 'forceMap',
    x = list(dataJSON, options),
    width = width,
    height = height,
    package = 'forceMap',
    elementId = elementId
  )
}

#' Shiny bindings for forceMap
#'
#' Output and render functions for using forceMap within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a forceMap
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name forceMap-shiny
#'
#' @export
forceMapOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'forceMap', width, height, package = 'forceMap')
}

#' @rdname forceMap-shiny
#' @export
renderForceMap <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, forceMapOutput, env, quoted = TRUE)
}
