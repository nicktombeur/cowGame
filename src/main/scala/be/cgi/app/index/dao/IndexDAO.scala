package be.cgi.app.index.dao

import be.cgi.app.CowGame
import be.cgi.app.index.model.IndexModel
import com.mongodb.casbah.Imports._
import com.novus.salat.dao.SalatDAO
import be.cgi.context._

/**
 * Created by nick on 7/10/15.
 */
class IndexDAO extends SalatDAO[IndexModel, ObjectId] (collection = MongoConnection()(CowGame.DbName)(CowGame.TestCol))
