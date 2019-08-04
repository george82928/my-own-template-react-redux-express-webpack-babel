pipeline {
    agent any
    parameters {
        string(defaultValue: 'master', description: 'branch', name: 'GIT_BRANCH')
    }
    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Pull from github') {
            steps {
                
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "npm install"
                sh "npm build"
            }
        }
        stage('Test') {
            steps {
                sh "npm run test:unit"
            }
        }
        stage('Deploy') {
            steps {
                echo "GIT BRANCH: *** -> ${params.GIT_BRANCH}"
                echo "successful!"
            }
        }
    }
}