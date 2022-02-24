import Google from 'passport-google-oauth20';
import config from './../config';
import { UserModel } from './../models/user.model';

const GoogleStrategy = Google.Strategy;

module.exports = function (passport: any) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: config.GOOGLE_CLIENT_ID,
				clientSecret: config.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					googleId: profile.id,
					displayName: profile.displayName,
					firstName: profile.name?.givenName,
					lastName: profile.name?.familyName,
					image: profile.photos?.[0].value,
				}

				try {
					let user = await UserModel.findOne({ googleId: profile.id })

					if (user) {
						done(null, user)
					} else {
						user = await UserModel.create(newUser)
						done(null, user)
					}
				} catch (err) {
					console.error(err)
				}
			}
		)
	)

	passport.serializeUser((user: { id: any; }, done: (arg0: null, arg1: any) => void) => {
		done(null, user.id)
	})

	passport.deserializeUser((id: any, done: (arg0: any, arg1: any) => any) => {
		UserModel.findById(id, (err: any, user: any) => done(err, user))
	})
}

