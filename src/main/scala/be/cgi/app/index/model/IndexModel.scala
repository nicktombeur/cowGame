package be.cgi.app.index.model

import com.mongodb.casbah.Imports._
import com.novus.salat.dao.SalatDAO
import com.novus.salat.global._

import scala.language.implicitConversions

/**
 * Created by nick on 2/26/15.
 */
case class IndexModel(_id: ObjectId = new ObjectId,
                      name: String)
