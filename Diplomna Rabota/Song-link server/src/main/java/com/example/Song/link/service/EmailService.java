package com.example.Song.link.service;

import com.example.Song.link.exception.CustomException;
import com.example.Song.link.mailModel.Recipient;
import com.example.Song.link.mailModel.RecipientConfirmation;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

@Service
public class EmailService {

    public static final String RECIPIENT = "recipient";

    final Configuration configuration;
    final JavaMailSender javaMailSender;

    public EmailService(Configuration configuration, JavaMailSender javaMailSender) {
        this.configuration = configuration;
        this.javaMailSender = javaMailSender;
    }

    public CompletableFuture<Boolean> sendConfirmationMailFuture(RecipientConfirmation recipient, String template) throws MessagingException, TemplateException, IOException, CustomException {
        return CompletableFuture.supplyAsync(() -> {
            try {
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();

                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
                helper.setSubject(recipient.getSubject());
                helper.setTo(recipient.getEmail());
                String emailContent = getEmailContentConfrirmation(recipient, template);
                helper.setText(emailContent, true);
                javaMailSender.send(mimeMessage);
                return true;
            } catch (Exception e) {
                throw new CompletionException(e);
            }
        });
    }

    public void sendConfirmationMail(RecipientConfirmation recipient, String template) throws MessagingException, TemplateException, IOException, CustomException {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
            helper.setSubject(recipient.getSubject());
            helper.setTo(recipient.getEmail());
            String emailContent = getEmailContentConfrirmation(recipient, template);
            helper.setText(emailContent, true);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new CustomException("Email could not be sent due to a server error or email doesn't exist!");
        }
    }

    public void sendEmail(Recipient recipient, String template) throws MessagingException, IOException, TemplateException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        helper.setSubject(recipient.getSubject());
        helper.setTo(recipient.getEmail());

        String emailContent = getEmailContent(recipient, template);
        helper.setText(emailContent, true);
        javaMailSender.send(mimeMessage);
    }

    String getEmailContentConfrirmation(RecipientConfirmation recipientConfirmation, String template) throws IOException, TemplateException {
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put(RECIPIENT, recipientConfirmation);
        configuration.getTemplate(template).process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }

    String getEmailContent(Recipient recipient, String template) throws IOException, TemplateException {
        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put(RECIPIENT, recipient);
        configuration.getTemplate(template).process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }
}
