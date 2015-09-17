package be.cgi.app.participant.dao

import be.cgi.app.CowGame
import be.cgi.app.participant.model.Participant
import com.mongodb.casbah.Imports._
import com.novus.salat.dao.SalatDAO
import be.cgi.context._

/**
 * Created by nick on 9/17/15.
 */
class ParticipantDAO extends SalatDAO[Participant, ObjectId] (collection = MongoConnection()(CowGame.DbName)(CowGame.ParticipantCol))
