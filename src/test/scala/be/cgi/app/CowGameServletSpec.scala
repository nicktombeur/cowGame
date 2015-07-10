package be.cgi.app

import org.scalatra.test.specs2._

// For more on Specs2, see http://etorreborre.github.com/specs2/guide/org.specs2.guide.QuickStart.html
class CowGameServletSpec extends ScalatraSpec { def is =
  "GET / on IndexController"                     ^
    "should return status 200"                  ! root200^
                                                end

  //addServlet(classOf[IndexController], "/api/*")

  def root200 = get("/") {
    status must_== 200
  }

  def test = get("/test") {
    status must_== 200
  }
}
