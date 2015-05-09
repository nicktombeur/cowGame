package be.cgi.app.common.auth.strategy

import javax.servlet.http.{HttpServletResponse, HttpServletRequest}

import be.cgi.app.common.auth.model.User
import org.scalatra.ScalatraBase
import org.scalatra.auth.strategy.BasicAuthStrategy

/**
 * Created by nicktombeur on 08/05/15.
 */
class CGIBasicAuthStrategy(protected override val app: ScalatraBase, realm: String)
  extends BasicAuthStrategy[User](app, realm) {

  protected def validate(userName: String, password: String)
                        (implicit request: HttpServletRequest, response: HttpServletResponse): Option[User] = {
    // TODO retrieval from data store
    // HTTP Header --> Authorization: Basic c2NhbGF0cmE6c2NhbGF0cmE=
    if (userName == "scalatra" && password == "scalatra")
      Some(User("scalatra"))
    else None
  }

  protected def getUserId(user: User)
                         (implicit request: HttpServletRequest, response: HttpServletResponse): String = {
    user.id
  }
}
