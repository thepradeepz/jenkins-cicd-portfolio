pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        S3_BUCKET = 'jenkins-cicd-portfolio-site-production'
        CLOUDFRONT_DISTRIBUTION_ID = 'E2S3H92I9SCSRV'
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('app') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                dir('app') {
                    sh "aws s3 sync dist/ s3://${S3_BUCKET} --delete --region ${AWS_REGION}"
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                sh "aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'"
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Visit: https://d1qtvv9lglkhmd.cloudfront.net"
        }
        failure {
            echo "Pipeline failed — check the logs above."
        }
    }
}