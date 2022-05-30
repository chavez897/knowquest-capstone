from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class BooksRatings(models.Model):

    book = models.ForeignKey(
        verbose_name="Book",
        on_delete=models.CASCADE,
        to="books.Books"
    )

    appropriateness = models.IntegerField(
        verbose_name="appropriateness",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    efectiveness = models.IntegerField(
        verbose_name="efectiveness",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    value = models.IntegerField(
        verbose_name="value",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    visual_aids = models.IntegerField(
        verbose_name="visual aids",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    overall = models.IntegerField(
        verbose_name="overall",
        validators=[MaxValueValidator(10), MinValueValidator(0)],
    )

    recommend = models.BooleanField(
        verbose_name="recommend",
    )

    instructor_manual_provided = models.BooleanField(
        verbose_name="instructor manual provided",
    )

    teaching_slides_provided = models.BooleanField(
        verbose_name="teaching_slides_provided",
    )

    question_bank_provided = models.BooleanField(
        verbose_name="question_bank_provided",
    )

    digital_resource_provided = models.BooleanField(
        verbose_name="digital_resource_provided",
    )

    assigments_provided = models.BooleanField(
        verbose_name="assigments_provided",
    )

    instructor_manual_used = models.BooleanField(
        verbose_name="instructor manual used",
    )

    teaching_slides_used = models.BooleanField(
        verbose_name="teaching_slides_used",
    )

    question_bank_used = models.BooleanField(
        verbose_name="question_bank_used",
    )

    digital_resource_used = models.BooleanField(
        verbose_name="digital_resource_used",
    )

    assigments_used = models.BooleanField(
        verbose_name="assigments_used",
    )
    
    use_again = models.BooleanField(
        verbose_name="use again",
    )

    comments = models.TextField(
        verbose_name="comments",
        blank=True,
        null=True,
    )
    

    class Meta:
        verbose_name = "book rating"
        verbose_name_plural = "book ratings"

    def __str__(self):
        return "{} - {}".format(self.book.title, self.overall)