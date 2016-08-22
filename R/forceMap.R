#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
forceMap <- function(data, width = NULL, height = NULL, elementId = NULL) {

  
  #create json object for use in JS  
  countryDF$alias <- countrycode::countrycode(countryDF$name, origin='country.name', destination='iso3c')
  countryDF$continent <- countrycode::countrycode(countryDF$name, origin='country.name', destination='continent')
  
  x <- jsonlite::toJSON(countryDF)

  # create widget
  htmlwidgets::createWidget(
    name = 'forceMap',
    x,
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
