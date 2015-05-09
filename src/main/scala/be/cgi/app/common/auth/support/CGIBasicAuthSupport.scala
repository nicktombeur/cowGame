package be.cgi.app.common.auth.support

import be.cgi.app.common.auth.model.User
import be.cgi.app.common.auth.strategy.CGIBasicAuthStrategy
import org.scalatra.auth.{ScentryConfig, ScentrySupport}
import org.scalatra.auth.strategy.BasicAuthSupport
import org.scalatra.ScalatraBase

/**
 * Created by nicktombeur on 08/05/15.
 */
trait CGIBasicAuthSupport extends ScentrySupport[User] with BasicAuthSupport[User] {
  // any class which mixes in the BasicAuthenticationSupport trait must inherit from ScalatraBase.
  self: ScalatraBase =>

  val realm = "Basic Auth"

  protected def fromSession = {
    case id: String => User(id)
  }
  protected def toSession = {
    case user: User => user.id
  }

  protected val scentryConfig = new ScentryConfig{}.asInstanceOf[ScentryConfiguration]

  override protected def configureScentry = {
    scentry.unauthenticated {
      scentry.strategies("Basic").unauthenticated()
    }
  }

  override protected def registerAuthStrategies = {
    scentry.register("Basic", app => new CGIBasicAuthStrategy(app, realm))
  }
}
